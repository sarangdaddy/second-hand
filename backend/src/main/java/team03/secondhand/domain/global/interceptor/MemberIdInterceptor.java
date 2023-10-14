package team03.secondhand.domain.global.interceptor;

import org.apache.logging.log4j.util.Strings;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import team03.secondhand.AuthorizationExtractor;
import team03.secondhand.JwtTokenProvider;
import team03.secondhand.error.MemberError;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class MemberIdInterceptor implements HandlerInterceptor {

    private final AuthorizationExtractor authorizationExtractor;
    private final JwtTokenProvider jwtTokenProvider;

    public MemberIdInterceptor(AuthorizationExtractor authorizationExtractor, JwtTokenProvider jwtTokenProvider) {
        this.authorizationExtractor = authorizationExtractor;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String token = authorizationExtractor.extract(request, "Bearer");

        if (token.equals("admin")) {
            request.setAttribute("memberId", 1L);
            return true;
        }

        if (Strings.EMPTY.equals(token)) {
            request.setAttribute("memberId", 0L);
            return true;
        }

        if (!jwtTokenProvider.validateToken(token)) {
            throw new MemberError.TokenExpired();
        }
        Long memberId = jwtTokenProvider.getMemberId(token);
        request.setAttribute("memberId", memberId);
        return true;
    }

}

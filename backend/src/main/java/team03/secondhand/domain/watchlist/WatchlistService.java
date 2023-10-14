package team03.secondhand.domain.watchlist;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import team03.secondhand.domain.member.Member;
import team03.secondhand.domain.member.MemberRepository;
import team03.secondhand.domain.product.Product;
import team03.secondhand.domain.product.ProductRepository;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class WatchlistService {

    private final WatchlistRepository watchlistRepository;
    private final ProductRepository productRepository;
    private final MemberRepository memberRepository;

    // TODO: 에러부분 협의 방향으로 수정 필요
    @Transactional
    public void addToWatchlist(Long productId, Long memberId) {
        Product product = productRepository.findById(productId).orElseThrow(() ->
                new IllegalArgumentException("Product not found with ID: " + productId));
        Member member = memberRepository.findById(memberId).orElseThrow(() ->
                new IllegalArgumentException("Member not found with ID: " + memberId));

        Watchlist watchlist = Watchlist.builder()
                .product(product)
                .member(member)
                .build();

        watchlistRepository.save(watchlist);
    }

    // TODO: 에러부분 협의 방향으로 수정 필요
    @Transactional
    public void deleteToWatchlist(Long productId, Long memberId) {
        Watchlist watchlist = watchlistRepository.findByProduct_ProductIdAndMember_MemberId(productId, memberId);
        if (watchlist == null) {
            throw new IllegalArgumentException("Watchlist not found for memberId: " + memberId + " and productId: " + productId);
        }

        watchlistRepository.delete(watchlist);
    }
}

package team03.secondhand.domain.product;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import team03.secondhand.domain.category.Category;
import team03.secondhand.domain.category.CategoryRepository;
import team03.secondhand.domain.location.Location;
import team03.secondhand.domain.location.LocationRepository;
import team03.secondhand.domain.member.Member;
import team03.secondhand.domain.member.MemberRepository;
import team03.secondhand.domain.product.dto.ProductDataRequestDTO;
import team03.secondhand.domain.product.dto.ProductDataResponseDTO;
import team03.secondhand.domain.product.dto.ProductDataResponseVO;
import team03.secondhand.domain.productImg.ProductImgRepository;
import team03.secondhand.domain.watchlist.WatchlistRepository;
import team03.secondhand.error.MemberError;
import team03.secondhand.error.ProductError;
import team03.secondhand.util.imageUpload.ImageUploadModule;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final LocationRepository locationRepository;
    private final MemberRepository memberRepository;
    private final ProductImgRepository productImgRepository;
    private final WatchlistRepository watchlistRepository;
    private final ImageUploadModule imageUploadModule;

    /**
     * Public Method
     */

    @Transactional
    public ProductDataResponseDTO.SimpleInfo createProduct(Long memberId, ProductDataRequestDTO request) {
        if (memberId == 0L) {
            throw new MemberError.InvalidGuest();
        }

        // Get Info
        Category category = categoryRepository.getReferenceById(request.getCategoryId());
        Location location = locationRepository.getReferenceById(request.getLocationId());
        Member member = memberRepository.getReferenceById(memberId);

        // Create Product
        Product product = Product.builder()
                .title(request.getTitle())
                .price(request.getPrice())
                .content(request.getContent())
                .category(category)
                .location(location)
                .member(member)
                .build();
        Product savedProduct = productRepository.save(product);

        // Upload Product Images
        uploadProductImages(request.getProductImageUrls(), product);

        return convertToProductDTO(savedProduct);
    }

    @Transactional
    public List<ProductDataResponseDTO.HomeInfo> getAllProductByFilter(Long memberId, Long locationId, Long categoryId) {
        List<Product> products;
        if (locationId == null) {
            products = productRepository.findAllByOrderByUpdatedAtDesc();
        } else {
            products = productRepository.findProductByFilter(locationId, categoryId);
        }

        return products.stream()
                .map(product -> convertToHomeDTO(product, memberId))
                .collect(Collectors.toList());
    }

    @Transactional
    public ProductDataResponseDTO.DetailInfo getProductBy(Long memberId, Long productId) {
        Product product = productRepository.findProductByProductId(productId)
                .orElseThrow(() -> new ProductError.NotFoundProduct());

        return new ProductDataResponseDTO.DetailInfo(product, memberId);
    }

    private ProductDataResponseDTO.SimpleInfo convertToProductDTO(Product product) {
        return new ProductDataResponseDTO.SimpleInfo(product);
    }

    /**
     * Private Method
     */

    private ProductDataResponseDTO.HomeInfo convertToHomeDTO(Product product, Long memberId) {
        String locationShortening = product.getLocation().getLocationShortening();
        // TODO: 1. 채팅룸 기능 구현시 카운터 체크 기능 추가 바람
        int watchlistCount = watchlistRepository.countByProduct_ProductId(product.getProductId());
        boolean isWatchlistChecked = watchlistRepository.existsByProductProductIdAndMember_MemberId(product.getProductId(), memberId);
        String productImgUrl = productImgRepository.findFirstByProduct_ProductId(product.getProductId()).getImgUrl();

        ProductDataResponseVO responseVO = ProductDataResponseVO.builder()
                .location(locationShortening)
                .chatRoomCount(0L)
                .watchlistCount(watchlistCount)
                .isWatchlistChecked(isWatchlistChecked)
                .productMainImgUrl(productImgUrl)
                .build();

        return new ProductDataResponseDTO.HomeInfo(product, responseVO);
    }

    private void uploadProductImages(List<MultipartFile> multipartFiles, Product product) {
        product.clearProductId();

        int indexNum = 0;
        for (MultipartFile multipartFile : multipartFiles) {

            indexNum += 1;
            String imgName = product.getProductId() + "-" + indexNum; // 파일 이름(물품ID + index)
            String imagePath = imageUploadModule.productImageUpload(multipartFile, imgName);

            product.addProductId(imagePath);
        }
    }

}

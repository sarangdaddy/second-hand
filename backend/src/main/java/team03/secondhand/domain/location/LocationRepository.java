package team03.secondhand.domain.location;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location, Long> {
    List<Location> findAllByLocationDetailsContains(String searchKey);

    List<Location> findAllByLocationIdIn(List<Long> locationIdList);

    List<Location> findByLocationShortening(String searchKey);
}

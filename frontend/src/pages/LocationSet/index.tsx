import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './styles';

import NavBarTitle from '../../components/NavBarTitle';
import { LOCATION } from '../../constants/routeUrl';
import { getLocation } from '../../api/location';
import useAsync from '../../hooks/useAsync';
import { SearchBar } from '../../components/SearchBar';

interface Location {
  locationId: number;
  locationDetails: string;
  locationShortening: string;
  isMainLocation: boolean;
}

export const LocationSetPage = () => {
  const navigate = useNavigate();

  const { data } = useAsync(getLocation);
  const locationList = data?.data;

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Location[]>([]);

  useEffect(() => {
    setSearchResults(locationList);
  }, [locationList]);

  useEffect(() => {
    const results = locationList?.filter((neighborhood: Location) =>
      neighborhood.locationShortening.startsWith(searchTerm),
    );
    setSearchResults(results);
  }, [searchTerm]);

  const handelBackClick = () => {
    navigate(LOCATION);
  };

  return (
    <>
      <NavBarTitle
        type="high"
        prevTitle="닫기"
        preTitleClick={handelBackClick}
      />
      <S.Main>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ul>
          {searchResults?.map((location: Location) => (
            <S.location key={location.locationId}>
              <span>{location.locationDetails}</span>
            </S.location>
          ))}
        </ul>
      </S.Main>
    </>
  );
};

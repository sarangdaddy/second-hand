import { useNavigate } from 'react-router-dom';

import NavBarHome from '../../components/NavBarHome';
import SecondHandItem from '../../components/SecondHandItem';
import { itemList } from '../../mocks/data';
import ErrorPage from '../Error';
import * as S from './styles';

// TODO(sarang_daddy) : API에서 가져오기
const sampleItems = itemList;

const isReusltEmpty: boolean = sampleItems?.length === 0;

const HomePage = () => {
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate('/Catalog');
  };

  return (
    <>
      <NavBarHome type="medium" iconOnClick={handleIconClick} />
      {!isReusltEmpty ? (
        <S.CurrentList>
          {sampleItems.map((item) => {
            return (
              <li key={item.id}>
                <SecondHandItem
                  title={item.title}
                  createdAt={item.createdAt}
                  status={item.status}
                  price={item.price}
                  location={item.location}
                  chatCount={item.chatCount}
                  interestCount={item.interestCount}
                  imageURI={item.imageURI}
                  option={false}
                />
              </li>
            );
          })}
        </S.CurrentList>
      ) : (
        <ErrorPage />
      )}
    </>
  );
};

export default HomePage;

import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../context/Auth';
import * as S from './styles';

import NavBarTitle from '../../components/NavBarTitle';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

interface Location {
  locationId: string;
  locationDetails: string;
  locationShortening: string;
  isMainLocation: boolean;
}

export const Location = () => {
  const navigate = useNavigate();

  const loggedInuserData = useAuthContext();
  console.log(loggedInuserData);

  // const accessToken = localStorage.getItem(ACCESS_TOKEN);
  // const [curLocationDatas, setCurLocationDatas] = useState<Location[]>([]);

  // // 사용자 정보에서 location 가져오기
  // const fetchUserDataRef = useRef<() => Promise<void> | undefined>(async () => {
  //   const { data: userData } = await getMembers(accessToken);
  //   const userLocationDatas = userData?.data?.locationDatas;

  //   setCurLocationDatas(userLocationDatas);
  // });

  // const fetchUserData = fetchUserDataRef.current;

  // useEffect(() => {
  //   fetchUserData();
  // }, [accessToken]);

  // console.log(curLocationDatas);

  const handelBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <NavBarTitle
        type="high"
        prevTitle="닫기"
        preTitleClick={handelBackClick}
        centerTitle="동네 설정"
      />
      <S.Main>
        <S.LocationContainer>
          <S.Signboard>
            <span>지역은 최소 1개,</span>
            <span>최대 2개까지 설정 가능해요.</span>
          </S.Signboard>
          <S.BtnContainer>
            <Button active fullWidth>
              <Icon name="symbol" width="18" height="20" />
            </Button>
            <Button active fullWidth>
              <Icon name="symbol" width="18" height="20" />
            </Button>
          </S.BtnContainer>
        </S.LocationContainer>
      </S.Main>
    </>
  );
};

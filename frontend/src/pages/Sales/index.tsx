import NavBarTitle from '../../components/NavBarTitle';
import { MyItemsTap } from '../../components/MyItemsTap';

const SalesPage = () => {
  return (
    <>
      <NavBarTitle type="high" centerTitle="판매 내역">
        <MyItemsTap />
      </NavBarTitle>
    </>
  );
};

export default SalesPage;

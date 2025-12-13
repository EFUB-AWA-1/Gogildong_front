import MenuButton from '@/Gildong/components/MenuButton';
import closetIcon from "../assets/closetIcon.svg";
import shopIcon from "../assets/shopIcon.svg";
import rankIcon from "../assets/rankIcon.svg";
import { useNavigate } from 'react-router-dom';

export default function MenuButtonContainer() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row">
      <MenuButton buttonName="내 옷장" buttonIcon={<img src={closetIcon}/>} />
      <MenuButton buttonName="상점" buttonIcon={<img src={shopIcon}/>} />
      <MenuButton buttonName="랭킹" buttonIcon={<img src={rankIcon}/>} onClick={() => navigate("/ranking")}/>
    </div>
  );
}

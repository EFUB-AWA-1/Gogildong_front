import MenuButton from '@/Gildong/components/MenuButton';
import closetIcon from '../assets/closetIcon.svg';
import shopIcon from '../assets/shopIcon.svg';
import rankIcon from '../assets/rankIcon.svg';
import { useNavigate } from 'react-router-dom';

type MenuButtonContainerProps = {
  selected?: 'closet' | 'shop' | 'ranking';
};

export default function MenuButtonContainer({
  selected
}: MenuButtonContainerProps) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row">
      <MenuButton
        selected={selected === 'closet'}
        onClick={() => navigate('/closet')}
        buttonName="내 옷장"
        buttonIcon={<img src={closetIcon} />}
      />
      <MenuButton
        selected={selected === 'shop'}
        buttonName="상점"
        buttonIcon={<img src={shopIcon} />}
      />
      <MenuButton
        selected={selected === 'ranking'}
        buttonName="랭킹"
        buttonIcon={<img src={rankIcon} />}
        onClick={() => navigate('/ranking')}
      />
    </div>
  );
}

import '../../css/SocialDropdown.css'

function DropdownOption({type}){
    var href = "";
    switch(type){
      case 'Instagram':
        href = 'https://www.instagram.com/_alivanov__/'
        break;
      case 'YouTube':
        href = 'https://www.youtube.com/@alivanov247';
        break;
      case 'Discord':
        href = 'https://discord.com/invite/Pge52B5U';
        break;
      default:
        console.log('Error!')
        break;
    }
  
    return (
      <a href={href} className = 'SocialDropdownOption'>
        <img className = 'socialOption' alt = "" src={process.env.PUBLIC_URL + '/images/' + type + 'Logo.png'}/>
      </a>
      );
  }
  
 export default function SocialDropdown({dropdown}){
    return (
      <div className = {`SocialDropdown ${(dropdown && window.innerWidth < 800)? 'slide-down' : 'slide-up'}`}>
        <DropdownOption type = 'Discord'/>
        <DropdownOption type = 'Instagram'/>
        <DropdownOption type = 'YouTube' />
      </div>
    );
  }
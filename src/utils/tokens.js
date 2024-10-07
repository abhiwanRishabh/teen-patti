
import {} from "../assets/tokens/"

const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  };
  
  const images = importAll(require.context('./', false, /\.(png|jpe?g|svg|webp)$/));
  
  
const getCards=(cards)=>{

    const importAll = (r) => {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
      };
      
      const images = importAll(require.context('../assets/tokens/', false, /\.(png|jpe?g|svg|webp)$/));

      return images;

}
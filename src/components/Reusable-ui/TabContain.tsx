import { FaEuroSign, FaCamera, } from "react-icons/fa";
import styled from "styled-components";
import Btn from "../../components/Reusable-ui/Btn";
import { FaBurger } from "react-icons/fa6";
import { GrCubes } from "react-icons/gr";
import { FaBullhorn } from "react-icons/fa";



export default function TabContain() {
    
  return (
    <TabContainStyle>
      <div className="img-Input">
        <img
          src="https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJ1cmdlcnxlbnwwfHx8fDE2NjYwNzEzODY&ixlib=rb-1.2.1&q=80&w=200"
          alt="Delicious Burger"
        />

        <div className="inputBlock">
          <div className="iconInput">
            <FaBurger size={25} color="grey" />
            <input type="text" placeholder="Burger's name!" />
          </div>

          <div className="iconInput">
            <FaCamera size={25} color="grey" />
            <input type="text" placeholder="Download an image" />
          </div>

          <div className="lastInputBlock">
            <div className="iconInput">
              <FaEuroSign size={25} color="grey" />
              <input type="text" placeholder="Give a price" />
            </div>

            <div className="iconInput">
              <GrCubes size={20} color="grey" />
              <select>
                <option value="with_ad">En Stock</option>
                <option value="ad_free">Pénurie</option>
              </select>
            </div>

            <div className="iconInput">
              <FaBullhorn size={20} color="grey" />
              <select>
                <option value="with_ad">Avec pub</option>
                <option value="ad_free">Sans pub</option>
              </select>
            </div>
          </div>
        </div>
      </div>

    <div className="Btn">
         <Btn />
    </div>
     

    </TabContainStyle>
  );
}

const TabContainStyle = styled.div`
  
  background-color: #f8f9fa;

  display: flex;
  flex-direction: column;
  justify-content:center;

  gap:15px;
  
  padding: 1rem 5rem;

  .img-Input {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  img {
    width: 15rem;
    height: 10rem;
    object-fit: cover;
    border: 1px solid orange;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .inputBlock {
    display: flex;
    flex-direction: column;
    gap: 10px;
   
    
    .iconInput {
      display: flex;
      align-items: center;
      gap: 2px;
      padding: 10px;
      background-color: #fff;
      border: 1px solid grey;
      border-radius: 5px;

      transition: border-color 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        border-color: orange;
        box-shadow: 0 0 10px rgba(235, 131, 23, 0.5);
      }

      input, select {
        border: none;
        outline: none;
        font-size: 1rem;
        flex: 1;
        padding: 0.1rem;
      }

      select {
        background-color: #fff;
        border-radius: 5px;
        padding: 0.1rem;
        cursor: pointer;
      }
    }

    .lastInputBlock {
      display: flex;
      gap: 10px;
      justify-content: space-between;
    }
  }



  .Btn {
    
     margin-left:-6rem;
  }
  
`;

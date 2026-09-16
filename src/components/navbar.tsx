import dayjs from "dayjs";
import { navIcons, navLinks } from "../constants";

const Navbar = () => {
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="Mac navbar" />
        <p className="font-bold">Simuratli</p>
        <ul>
          {navLinks.map(({ id, name }) => {
            return (
              <li key={id}>
                <p>{name}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <ul>
            {
                navIcons.map(({ id, img, }) => {
                  return (
                    <li key={id}>
                      <img src={img} alt={`Icon ${id}`}  className="icon-hover"/>
                    </li>
                  );
                })
            }
        </ul>
        <time>
            {dayjs().format("ddd MMM h:mm A") }
        </time>
      </div>
    </nav>
  );
};

export default Navbar;

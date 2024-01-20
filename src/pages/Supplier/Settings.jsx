import { FaStore } from "react-icons/fa";
import { IoPersonCircleSharp, IoSettings } from "react-icons/io5";
import { MdAttachMoney, MdLocalShipping } from "react-icons/md";
import { GoRepoForked } from "react-icons/go";
import { LuSettings2 } from "react-icons/lu";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <main
      className="px-0 px-md-3"
      style={{ backgroundColor: "rgb(250, 250, 251)" }}
    >
      <section className="container-fluid">
        <h2 className="d-flex align-items-center gap-2 dashboard__title mt-2">
          Settings
        </h2>
        <div className="col-12 p-4 gap-4 d-flex flex-wrap" style={{ backgroundColor: "#fff" }}>
          <Link to="../../account/profile" className="d-flex gap-2">
            <div className="settings-icon">
              <IoSettings size={25} />
            </div>
            <div>
              <h5 className="card-title mb-0 dashboard__stats-card-title">
                Personal settings
              </h5>
              <p className="text-wrap desc">
                My settings and Language
              </p>
            </div>
          </Link>
          <Link className="d-flex gap-2">
            <div className="settings-icon">
              <IoPersonCircleSharp size={25} />
            </div>
            <div>
              <h5 className="card-title mb-0 dashboard__stats-card-title">
                User and permissions
              </h5>
              <p className="text-wrap desc">
                Lorem ipsum dolor sit amet
              </p>
            </div>
          </Link>
          <Link to="companySettings" className="d-flex gap-2">
            <div className="settings-icon">
              <LuSettings2 size={25} />
            </div>
            <div>
              <h5 className="card-title mb-0 dashboard__stats-card-title">
                Company settings
              </h5>
              <p className="text-wrap desc">
                Lorem ipsum dolor sit amet
              </p>
            </div>
          </Link>
          <Link className="d-flex gap-2">
            <div
              className="settings-icon">
              <FaStore size={25} />
            </div>
            <div>
              <h5 className="card-title mb-0 dashboard__stats-card-title">
                Store
              </h5>
              <p className="text-wrap desc">
                Lorem ipsum dolor sit amet
              </p>
            </div>
          </Link>
          <Link className="d-flex gap-2">
            <div
              className="settings-icon">
              <MdLocalShipping size={25} />
            </div>
            <div>
              <h5 className="card-title mb-0 dashboard__stats-card-title">
                Shipping and delivery
              </h5>
              <p className="text-wrap desc">
                Lorem ipsum dolor sit amet
              </p>
            </div>
          </Link>
          <Link className="d-flex gap-2">
            <div
              className="settings-icon">
              <GoRepoForked size={25} />
            </div>
            <div>
              <h5 className="card-title mb-0 dashboard__stats-card-title">
                Branches
              </h5>
              <p className="text-wrap desc">
                Lorem ipsum dolor sit amet
              </p>
            </div>
          </Link>
          <Link className="d-flex gap-2">
            <div
              className="settings-icon">
              <MdAttachMoney size={25} />
            </div>
            <div>
              <h5 className="card-title mb-0 dashboard__stats-card-title">
                Billing
              </h5>
              <p className="text-wrap desc">
                Lorem ipsum dolor sit amet
              </p>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
};
export default Settings;

import React, { useState, useEffect } from "react";
// import avatar1 from "../assets/avatars/avatar1.png";
// import avatar2 from "../assets/avatars/avatar2.png";
// import avatar3 from "../assets/avatars/avatar3.png";
// import avatar4 from "../assets/avatars/avatar4.png";
// import avatar5 from "../assets/avatars/avatar5.png";
// import avatar6 from "../assets/avatars/avatar6.png";
// import avatar7 from "../assets/avatars/avatar7.png";
// import avatar8 from "../assets/avatars/avatar8.png";
// import avatar9 from "../assets/avatars/avatar9.jpg";
// import avatar10 from "../assets/avatars/avatar10.jpg";
// import avatar11 from "../assets/avatars/avatar11.jpg";
// import avatar12 from "../assets/avatars/avatar12.jpg";
// import avatar13 from "../assets/avatars/avatar13.jpg";
// import avatar14 from "../assets/avatars/avatar14.jpg";
 
// const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9, avatar10, avatar11, avatar12, avatar13, avatar14];

const AvatarSelector = ({ selectedAvatar, handleAvatar }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [avatars, setAvatars] = useState([]);
  
    useEffect(() => {
      const importAvatars = async () => {
        const avatarModules = await Promise.all(
          Array.from({ length: 14 }, (_, index) =>
            import(`../assets/avatars/avatar${index + 1}.${index < 8 ? 'png' : 'jpg'}`)
          )
        );
        setAvatars(avatarModules.map(module => module.default));
      };
  
      importAvatars();
    }, []);



  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" flex flex-col items-center mt-24 gap-2 text-xl max-sm:text-base ">
      <p>Please click and scroll down to choose your avatar</p>

      <div className="relative flex justify-center ">
        <div className="cursor-pointer " onClick={toggleDropdown}>
          <img
            src={selectedAvatar}
            alt="Selected Avatar"
            className="h-24 w-24 rounded-full object-cover"
          />
        </div>
        {isOpen && (
          <div className="absolute top-full mt-2  bg-white shadow-lg rounded-md overflow-y-auto h-48 lg:w-[400px] lg:grid lg:grid-cols-6">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className="cursor-pointer p-2"
                onClick={() => {
                  setIsOpen(false);
                  handleAvatar(avatar);
                }}
              >
                <img
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  className="h-12 w-12 rounded-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarSelector;

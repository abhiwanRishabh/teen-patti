import ModalWrapper from "./ModalWrapper/ModalWrapper";
import userProfile from "../../assets/profiles/userProfile.svg";
import editIcon from "../../assets/icons/editIcon.svg";
import Text from "../text/Text";
import Divider from "../divider/Divider";
import ProfileCard from "../cards/ProfileCard";
import profile1 from "../../assets/profiles/profile1.svg";
import profile2 from "../../assets/profiles/profile2.svg";
import profile3 from "../../assets/profiles/profile3.svg";
import profile4 from "../../assets/profiles/profile4.svg";
import profile5 from "../../assets/profiles/profile5.svg";


function ProfileModal({
    openProfileModal,
    setOpenProfileModal
}) {

    let profiles = [
        profile1,
        profile2,
        profile3,
        profile4,
        profile5
    ]

    return (
        <ModalWrapper show={openProfileModal} onClose={() => setOpenProfileModal(false)} title="Profile" size="md" >

            <div>
                {/* profile and username */}

                <div className="flex flex-col justify-center items-center ">
                    <img src={userProfile} alt="user Profile" />

                    <div className="flex gap-2 items-center">
                        <Text title={"UserName"} color={"text-white"} />
                        <img src={editIcon} alt="EditIcon" className="w-1/6" />
                    </div>
                </div>
                
                {/* Equip profile  */}
                <Divider w={"w-2/3"}></Divider>

                <div className="flex gap-4 p-6 w-80 items-center flex-wrap">
                    {
                        profiles.map((e, i) => {
                            return <ProfileCard key={i} icon={e} btnText={i == 0 ? "Gallery" : i === 1 ? "Equipped" : "Equip"} isActive={i == 1} ></ProfileCard>
                        })
                    }
                </div>

            </div>
        </ModalWrapper>
    )
}

export default ProfileModal;
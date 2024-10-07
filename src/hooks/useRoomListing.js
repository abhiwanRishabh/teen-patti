import {useCallback, useEffect, useState} from "react";
import {publish, subscribe, unsubscribe} from "../CustomEvents/event";
import {OnLocalRoomListUpdate, OnRoomListing, RoomListing, onCreateRoom} from "../constants/socketKeys";
import {useDispatch, useSelector} from "react-redux";


export function useRoomListing(modalShow) {
    const {isCreated} = useSelector((state) => state.game);
    const [rooms, setRooms] = useState([]);
    const dispatch = useDispatch();

    const onHandleCreateRoom = useCallback(() => {
        // //("onHandleCreateRoom", data);
        // dispatch(setIsCreated(true));
        publish(RoomListing);
    }, []);

    useEffect(() => {
        const fetchRoomList = async (data) => {
            var rooms = data.detail.data;
            // //("roomslist>>",rooms)
            const openRooms = rooms.filter((room) => {
                if (room?.maxPlayers !== room?.totalPlayers) {
                    return room;
                }
            });
            setRooms(openRooms);
        };

        subscribe(OnRoomListing, fetchRoomList);
        // subscribe(onCreateRoom, onHandleCreateRoom);
        subscribe(OnLocalRoomListUpdate, () => {
            publish(RoomListing);
        });
        // fetch room listing
        if (modalShow || isCreated) {
            // debugger;
            publish(RoomListing);
        }
        return () => {
            unsubscribe(OnRoomListing);
            unsubscribe(onCreateRoom, onHandleCreateRoom);
        };
    }, [modalShow, isCreated, onHandleCreateRoom]);
    return [rooms];
}

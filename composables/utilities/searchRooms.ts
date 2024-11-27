import { generalStore } from '@/stores/general'

export const useDateSearchRooms = () => {

    let store = generalStore();
    let numRooms = ref(1);
    interface ageOpt {
        label: string;
        value: any
    }
    interface RoomData {
        adult?: number,
        child?: number,
        ages_child?: ageOpt[]
    }
    const  updateData = ()=>{
        const totalAdults = store.totalRooms.reduce((sum: any, room: { adult: any; }) => sum + (room.adult || 0), 0);
        const totalChilds = store.totalRooms.reduce((sum: any, room: { child: any; }) => sum + (room.child || 0), 0);
        store.totalAdults = totalAdults;
        store.totalChilds = totalChilds;
        store.totalRoomsLength = store.totalRooms.length;
        store.searchObj.occupancy.rooms = store.totalRooms.map((ele)=>{
            return {
                adults: ele.adult,
                childrenAges: ele.ages_child.map((child)=> child.value)
            }
        })
    }
    const addRoom = () => {
        const currentLength = store.totalRooms.length;
        if (numRooms.value > currentLength) {
            for (let i = currentLength; i < numRooms.value; i++) {
                store.totalRooms.push({
                    adult: 1,
                    child: 0,
                    ages_child: []
                });
            }
        }
        else if (numRooms.value < currentLength) {
            store.totalRooms = store.totalRooms.slice(0, numRooms.value);
        }
        updateData();
    }
    const addAgesChids = (num: number, index: string | number) => {
        const lengthRoom = store.totalRooms[index].ages_child.length
        console.log(num);
        console.log(lengthRoom);
        if (num > lengthRoom) {
            for (let i = lengthRoom; i < num; i++) {
                store.totalRooms[index].ages_child.push({
                    value: 1
                });
            }
        } else {
            store.totalRooms[index].ages_child.splice(num)
        }
        updateData();
    }
    return {
        numRooms,
        updateData,
        addRoom,
        addAgesChids
    }
  }
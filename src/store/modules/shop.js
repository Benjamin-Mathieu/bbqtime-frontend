import popup from '../../components/ToastController';
import axios from "axios";
import httpErrorHandler from '../httpErrorHandler';

const URL_API = "http://192.168.1.47:3000/";

const modulShop = {
    state: () => ({
        plats: []
    }),

    mutations: {
        setShop(state, plat) {
            if (!state.plats.map(plat => plat.id).includes(plat.id)) {
                state.plats.push(plat);
                popup.success("Plat ajouté au panier");
            } else {
                this.commit("updateShop", plat);
            }
        },
        updateShop(state, plat) {
            for (let i = 0; i < state.plats.length; i++)
                if (state.plats[i].id == plat.id) {
                    state.plats[i].qty = plat.qty;
                }
        },
        clearShop(state) {
            state.plats = [];
        },
        removePlatInShop(state, plat) {
            console.log(state, plat);
            for (let i = 0; i < state.plats.length; i++)
                if (state.plats[i].id === plat.id) {
                    state.plats[i].qty = 0; //reset qty before remove to store
                    state.plats.splice(i, 1);
                }
        }
    },

    getters: {
        getTotalShop(state) {
            let totalOrder = 0;
            if (state.plats.length > 0) {
                state.plats.forEach((plat) => {
                    totalOrder += plat.price * plat.qty;
                });
                return totalOrder;
            } else {
                return totalOrder;
            }

        },
        getNumberItemInShop(state) {
            let numberOfItem = 0;
            if (state.plats.length > 0) {
                state.plats.forEach(() => {
                    numberOfItem++;
                });
                return numberOfItem;
            }
            return numberOfItem;
        }
    },

    actions: {
        async postOrder({ commit, state, rootState }) {
            await axios({
                method: "post",
                url: URL_API + 'orders',
                data: {
                    event_id: rootState.events.eventDetails.id,
                    plats: state.plats,
                },
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            })
                .then(resp => {
                    popup.success(resp.data.message);
                    commit("clearShop");
                }
                ).catch(httpErrorHandler);
        }
    }
}
export default modulShop;
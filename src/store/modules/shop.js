import popup from '../../components/ToastController';
import axios from "axios";

const URL_API = "http://192.168.1.47:3000/";

const modulShop = {
    state: () => ({
        plats: []
    }),

    mutations: {
        setShop(state, plat) {
            if (!state.plats.includes(plat)) {
                state.plats.push(plat);
                popup.success("Plat ajouté au panier");
            }
        },
        updateShop(state, plat) {
            for (let i = 0; i < state.plats.length; i++)
                if (state.plats[i].id == plat.id) {
                    state.plats[i].qty = plat.qty;
                }
        },
        clearShop(state) {
            Object.assign(state, {});
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
        postOrder({ commit, state, rootState }) {
            axios({
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
                    if (resp.status === 201) {
                        popup.success("Commande effectué");
                        commit("clearShop");
                    }
                }
                ).catch(err => {
                    console.log(err)
                });
        }
    }
}
export default modulShop;
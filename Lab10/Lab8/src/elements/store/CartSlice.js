import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addProduct: (state, action) => {
            let id = state.findIndex((item) => item.id === action.payload.id);
            if (action.payload.inStock !== false) {
                if (id === -1) {
                    state.push(action.payload);
                    action.payload.counter = 1;
                } else {
                    state[id].counter += action.payload.counter;
                }
            } else {
                alert("This item is out of stock!");
            }
        },
        removeProduct: (state, action) => {
            let id = state.findIndex((item) => item.id === action.payload.id);
            state.splice(id, 1);
        },
        increment: (state, action) => {
            let id = state.findIndex((item) => item.id === action.payload.id);
            state[id].counter += 1;
        },
        decrement: (state, action) => {
            let id = state.findIndex((item) => item.id === action.payload.id);
            if (state[id].counter > 1) {
                state[id].counter -= 1;
            }
        },
    },
});

export const { addProduct, removeProduct, increment, decrement } =
    cartSlice.actions;
export default cartSlice.reducer;
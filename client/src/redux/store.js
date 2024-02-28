import { configureStore } from "@reduxjs/toolkit";


const store = configure({
    reducer: {
        loaders: loadersSlice.reducer,
    },
});

export default store;
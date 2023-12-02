import {createSlice} from '@reduxjs/toolkit';

const errorModalState = createSlice({
    name: 'errorModal',
    initialState:{
        errorMessage: null,
        isOpen: false,
    },
    reducers:{
        openModal: function (state, action) {
            state.isOpen = true;
            state.errorMessage = action.payload;
        },

        closeModal: function (state) {
            state.isOpen = false;
            state.errorMessage = null;
        }
    }
});

export const {openModal, closeModal} = errorModalState.actions;
export default errorModalState.reducer;
export const selectIsErrorModalOpen= state => state.errorModal.isOpen;
export const selectErrorModalMessage= state => state.errorModal.errorMessage;

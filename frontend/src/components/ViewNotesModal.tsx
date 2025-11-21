import { DoctorAppointment } from '@definitions/utils';
import React from 'react';
import Modal, { ModalProps } from 'react-responsive-modal';

interface PropTypes extends ModalProps {
    notes: DoctorAppointment['notes'];
}

const ViewNotesModal: React.FC<PropTypes> = ({ open, onClose, notes }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <div className="min-w-[340px] justify-around p-2 sm:min-w-md md:min-w-2xl">
                {notes.length < 1 ? (
                    <div className="px-2 py-1 bg-red-200 text-center text-red-700 md:w-2/3 rounded-sm">
                        No notes added for this for this appointment.
                    </div>
                ) : (
                    notes.map((note, idx) => (
                        <div className="mt-4" key={idx}>
                            <div className="flex gap-3 items-center sm:w-1/2">
                                <p>{note.user.name}</p>
                                <p
                                    className={`px-4 py-1 rounded-full text-xs ${note.user.role === 'admin' ? 'bg-green-100 text-green-600' : 'bg-yellow-200 text-yellow-700'} capitalize`}
                                >
                                    {note.user.role}
                                </p>
                            </div>
                            <div className="bg-gray-200 sm:w-2/3 p-2 mt-2 rounded-sm">
                                {note.note}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Modal>
    );
};

export default ViewNotesModal;

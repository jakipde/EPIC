import Modal from '@/Components/DaisyUI/Modal'
import JSONPretty from 'react-json-pretty'

export default function JsonModal({ modalState }) {
    return (
        <Modal isOpen={modalState.isOpen} onClose={modalState.toggle}>
            <JSONPretty data={modalState.data}></JSONPretty>
        </Modal>
    )
}

import ModalWrapper from "./ModalWrapper/ModalWrapper";

const InformationModal = ({ show, onClose, title, information }) => {
	return (
		<ModalWrapper show={show} onClose={onClose} title={title} size="md" >
			<div className="px-8 h-32 text-white   overflow-y-scroll text-justify">
				<p>{information} </p>
			</div>
		</ModalWrapper>
	);
}

export default InformationModal;

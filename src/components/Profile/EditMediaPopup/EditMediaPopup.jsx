import React, { useState } from 'react';
import s from './styles.module.css';

const EditMediaPopup = ({ media, onClose, onSave }) => {
	const [description, setDescription] = useState(media.description || '');
	const [isPublic, setIsPublic] = useState(media.isPublic);

	const handleSave = () => {
		onSave({ ...media, description, isPublic });
		onClose();
	};

	return (
		<div className={s.popup_overlay}>
			<div className={s.popup_content}>
				<h3 className={s.popup_title}>Edit Media</h3>
				<div className={s.popup_desc}>
					<label className={s.popup_label}>Description:</label>
					<textarea className={s.popup_textarea}
						value={description}
						onChange={e => setDescription(e.target.value)}
						rows={5}
					/>
				</div>
				<div className={s.popup_input}>
					<label>
						<input
							type="checkbox"
							checked={isPublic}
							onChange={() => setIsPublic(!isPublic)}
						/>
						Public
					</label>
				</div>
				<div className={s.popup_actions}>
					<button className={s.popup_buttons} onClick={handleSave}>Save</button>
					<button className={s.popup_buttons} onClick={onClose}>Cancel</button>
				</div>
			</div>
		</div>
	);
};

export default EditMediaPopup;

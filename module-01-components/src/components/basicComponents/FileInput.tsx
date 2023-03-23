import React from 'react';
import './FileInput.css';

interface FileInputProps {
  inputRef: React.RefObject<HTMLInputElement>;
  onInputChange: (value: string | ArrayBuffer) => void;
}

export class FileInput extends React.Component<FileInputProps> {
  render() {
    return (
      <div className="form__item">
        <input
          className="form__file"
          type="file"
          accept=".jpg, .jpeg, .png, .gif"
          ref={this.props.inputRef}
          onChange={(e) => {
            const file = e.target.files![0];
            const reader = new FileReader();
            reader.onload = (event) => {
              const base64String = event.target!.result;
              if (base64String) {
                this.props.onInputChange(base64String);
              }
            };
            reader.readAsDataURL(file);
          }}
          required
        ></input>
      </div>
    );
  }
}

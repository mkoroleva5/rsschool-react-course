import React from 'react';
import './FileInput.css';
import { Tooltip } from './Tooltip';

interface FileInputProps {
  isSubmitted: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  onInputChange: (value: string | ArrayBuffer) => void;
}

export class FileInput extends React.Component<FileInputProps> {
  render() {
    return (
      <div className="form__item">
        <input
          data-testid="file-input"
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
        ></input>
        {this.props.isSubmitted && !this.props.inputRef.current?.value && (
          <Tooltip message="Upload an image" />
        )}
      </div>
    );
  }
}

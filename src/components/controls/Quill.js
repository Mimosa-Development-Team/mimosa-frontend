import React from 'react'
import { InputLabel } from '@material-ui/core'
import ReactQuill, { Quill } from 'react-quill'
import ImageResize from 'quill-image-resize-module-react'
import 'react-quill/dist/quill.snow.css'

Quill.register('modules/imageResize', ImageResize)

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ script: 'sub' }, { script: 'super' }],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false
  },
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize'],
    displaySize: true
  }
}

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'script',
  'width',
  'height'
]

export default function Input(props) {
  const {
    name,
    error,
    helperText,
    control,
    label,
    labelFor,
    asterisk,
    ...propsList
  } = props
  return (
    <div className="inputWrapper">
      <InputLabel className="label" for={labelFor}>
        {label}{' '}
        {asterisk ? <span className="required">*</span> : null}
      </InputLabel>
      <ReactQuill
        className="input"
        modules={modules}
        formats={formats}
        {...propsList}
        preserveWhitespace
      />
      <span
        style={{
          color: '#f44336',
          fontSize: '.75rem',
          marginLeft: '14px'
        }}
      >
        {helperText}
      </span>
    </div>
  )
}

import React from 'react'
import { Controller } from 'react-hook-form'
import { InputLabel } from '@material-ui/core'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import styles from './style.module.scss'

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ script: 'sub' }, { script: 'super' }],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false
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
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video'
]

export default function Input(props) {
  const {
    name,
    control,
    label,
    asterisk,
    errors,
    ...propsList
  } = props
  return (
    <div className={`${styles.inputControl}`}>
      <InputLabel className={`${styles.label}`}>
        {label}{' '}
        {asterisk ? (
          <span className={`${styles.required}`}>*</span>
        ) : null}
      </InputLabel>
      <Controller
        control={control}
        name={name}
        render={({ onChange, value }) => (
          <ReactQuill
            className={`${styles.input}`}
            modules={modules}
            formats={formats}
            onChange={description => onChange(description)}
            value={value || ''}
            {...propsList}
          />
        )}
      />
      <p className={`${styles.error}`}>
        {errors[name] ? errors[name].message : null}
      </p>
    </div>
  )
}
import React from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'file'
}

const FormField = ({
  name,
  control,
  label,
  placeholder,
  type = 'text',
}: FormFieldProps<FieldValues>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormItem>
        <FormLabel className='label'>Username</FormLabel>
        <FormControl>
          <Input placeholder='shadcn' {...field} />
        </FormControl>
        <FormDescription>This is your public display name.</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
)

export default FormField

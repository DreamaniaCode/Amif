'use client';

import { Editor } from '@tinymce/tinymce-react';

interface RichEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  height?: number;
}

export function RichEditor({ value, onChange, placeholder = 'Saisissez votre contenu...', height = 400 }: RichEditorProps) {
  return (
    <div className="rich-editor-wrapper" style={{ border: '1px solid var(--admin-border)', borderRadius: '2px' }}>
      <Editor
        tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.8.2/tinymce.min.js"
        value={value}
        onEditorChange={(content) => onChange(content)}
        init={{
          height,
          menubar: false,
          statusbar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic underline strikethrough | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'link image media | removeformat | code help',
          content_style: 'body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:14px }',
          placeholder,
          skin: 'oxide',
          branding: false,
          promotion: false
        }}
      />
    </div>
  );
}

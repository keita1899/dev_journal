'use client'

import Placeholder from '@tiptap/extension-placeholder'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

type TiptapEditorProps = {
  value: string
  onChange: (html: string) => void
}

export const TiptapEditor = ({ value, onChange }: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: '日報を作成… 「# 」で見出し、「- 」でリスト',
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    autofocus: true,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'h-full prose dark:prose-invert max-w-none focus:outline-none p-4 min-h-[300px]',
      },
    },
  })

  useEffect(() => {
    if (!editor) return
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value, { emitUpdate: false })
    }
  }, [value, editor])

  return (
    <div className="h-full rounded-md dark:border-slate-700">
      <EditorContent editor={editor} className="h-full" />
    </div>
  )
}

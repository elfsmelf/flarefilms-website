'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo,
  Redo,
  ChevronDown,
  Link as LinkIcon,
  Unlink,
  ExternalLink,
} from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  disabled?: boolean
  placeholder?: string
}

export function RichTextEditor({ content, onChange, disabled, placeholder }: RichTextEditorProps) {
  const [headingDropdownOpen, setHeadingDropdownOpen] = useState(false)
  const [listDropdownOpen, setListDropdownOpen] = useState(false)
  const [linkPopoverOpen, setLinkPopoverOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Write your story here...',
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#b8a862] underline hover:text-[#a89752]',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
    ],
    content,
    editable: !disabled,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  // Update editor content when prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.link-popover') && !target.closest('.link-button')) {
        setLinkPopoverOpen(false)
      }
      if (!target.closest('.heading-dropdown')) {
        setHeadingDropdownOpen(false)
      }
      if (!target.closest('.list-dropdown')) {
        setListDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const setLink = useCallback(() => {
    if (!editor) return

    if (linkUrl === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      setLinkPopoverOpen(false)
      return
    }

    // Add https:// if no protocol is specified
    let url = linkUrl
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    setLinkPopoverOpen(false)
    setLinkUrl('')
  }, [editor, linkUrl])

  const openLinkPopover = useCallback(() => {
    if (!editor) return

    const previousUrl = editor.getAttributes('link').href || ''
    setLinkUrl(previousUrl)
    setLinkPopoverOpen(true)
  }, [editor])

  const removeLink = useCallback(() => {
    if (!editor) return
    editor.chain().focus().unsetLink().run()
  }, [editor])

  if (!editor) {
    return null
  }

  const getHeadingLabel = () => {
    if (editor.isActive('heading', { level: 1 })) return 'Heading 1'
    if (editor.isActive('heading', { level: 2 })) return 'Heading 2'
    if (editor.isActive('heading', { level: 3 })) return 'Heading 3'
    return 'Paragraph'
  }

  return (
    <div className="border border-[#d4cfca] focus-within:border-[#b8a862] transition-colors rounded-sm">
      {/* Toolbar - Sticky */}
      <div className="border-b border-[#d4cfca] bg-[#FAF9F7] p-2 flex gap-1 flex-wrap items-center sticky top-0 z-10">
        {/* Heading Dropdown */}
        <div className="relative heading-dropdown">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setHeadingDropdownOpen(!headingDropdownOpen)
              setListDropdownOpen(false)
              setLinkPopoverOpen(false)
            }}
            className="px-3 py-2 rounded hover:bg-[#d4cfca]/30 transition-colors text-[#7B756C] font-sans text-sm flex items-center gap-2 min-w-[120px] justify-between"
            disabled={disabled}
          >
            <span>{getHeadingLabel()}</span>
            <ChevronDown size={14} />
          </button>

          {headingDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-[#d4cfca] rounded shadow-lg z-20 min-w-[150px]">
              <button
                type="button"
                onClick={() => {
                  editor.chain().focus().setParagraph().run()
                  setHeadingDropdownOpen(false)
                }}
                className="w-full text-left px-4 py-2 text-sm font-sans text-[#7B756C] hover:bg-[#FAF9F7] transition-colors"
              >
                Paragraph
              </button>
              <button
                type="button"
                onClick={() => {
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                  setHeadingDropdownOpen(false)
                }}
                className="w-full text-left px-4 py-2 text-lg font-cormorant text-[#7B756C] hover:bg-[#FAF9F7] transition-colors"
              >
                Heading 1
              </button>
              <button
                type="button"
                onClick={() => {
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                  setHeadingDropdownOpen(false)
                }}
                className="w-full text-left px-4 py-2 text-base font-cormorant text-[#7B756C] hover:bg-[#FAF9F7] transition-colors"
              >
                Heading 2
              </button>
              <button
                type="button"
                onClick={() => {
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                  setHeadingDropdownOpen(false)
                }}
                className="w-full text-left px-4 py-2 text-sm font-cormorant text-[#7B756C] hover:bg-[#FAF9F7] transition-colors"
              >
                Heading 3
              </button>
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-[#d4cfca]" />

        {/* Text Formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-[#d4cfca]/30 transition-colors ${
            editor.isActive('bold') ? 'bg-[#b8a862]/20 text-[#b8a862]' : 'text-[#7B756C]'
          }`}
          disabled={disabled}
          title="Bold (Cmd+B)"
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-[#d4cfca]/30 transition-colors ${
            editor.isActive('italic') ? 'bg-[#b8a862]/20 text-[#b8a862]' : 'text-[#7B756C]'
          }`}
          disabled={disabled}
          title="Italic (Cmd+I)"
        >
          <Italic size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-[#d4cfca]/30 transition-colors ${
            editor.isActive('underline') ? 'bg-[#b8a862]/20 text-[#b8a862]' : 'text-[#7B756C]'
          }`}
          disabled={disabled}
          title="Underline (Cmd+U)"
        >
          <UnderlineIcon size={18} />
        </button>

        <div className="w-px h-6 bg-[#d4cfca]" />

        {/* Link Button */}
        <div className="relative">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              openLinkPopover()
              setHeadingDropdownOpen(false)
              setListDropdownOpen(false)
            }}
            className={`p-2 rounded hover:bg-[#d4cfca]/30 transition-colors link-button ${
              editor.isActive('link') ? 'bg-[#b8a862]/20 text-[#b8a862]' : 'text-[#7B756C]'
            }`}
            disabled={disabled}
            title="Add Link (Cmd+K)"
          >
            <LinkIcon size={18} />
          </button>

          {linkPopoverOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-[#d4cfca] rounded shadow-lg z-20 p-3 min-w-[300px] link-popover">
              <div className="flex items-center gap-2 mb-2">
                <ExternalLink size={16} className="text-[#7B756C]" />
                <span className="text-sm font-sans text-[#7B756C]">Link URL</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      setLink()
                    }
                  }}
                  placeholder="https://example.com"
                  className="flex-1 px-3 py-2 text-sm border border-[#d4cfca] rounded focus:border-[#b8a862] focus:outline-none"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={setLink}
                  className="px-3 py-2 bg-[#b8a862] text-white text-sm rounded hover:bg-[#a89752] transition-colors"
                >
                  Apply
                </button>
              </div>
              {editor.isActive('link') && (
                <button
                  type="button"
                  onClick={removeLink}
                  className="mt-2 flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                >
                  <Unlink size={14} />
                  Remove link
                </button>
              )}
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-[#d4cfca]" />

        {/* Lists Dropdown */}
        <div className="relative list-dropdown">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setListDropdownOpen(!listDropdownOpen)
              setHeadingDropdownOpen(false)
              setLinkPopoverOpen(false)
            }}
            className={`px-3 py-2 rounded hover:bg-[#d4cfca]/30 transition-colors font-sans text-sm flex items-center gap-2 ${
              editor.isActive('bulletList') || editor.isActive('orderedList')
                ? 'bg-[#b8a862]/20 text-[#b8a862]'
                : 'text-[#7B756C]'
            }`}
            disabled={disabled}
            title="Lists"
          >
            {editor.isActive('bulletList') ? (
              <List size={18} />
            ) : editor.isActive('orderedList') ? (
              <ListOrdered size={18} />
            ) : (
              <List size={18} />
            )}
            <ChevronDown size={14} />
          </button>

          {listDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-[#d4cfca] rounded shadow-lg z-20 min-w-[160px]">
              <button
                type="button"
                onClick={() => {
                  if (editor.isActive('bulletList')) {
                    editor.chain().focus().toggleBulletList().run()
                  } else if (editor.isActive('orderedList')) {
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  setListDropdownOpen(false)
                }}
                className={`w-full text-left px-4 py-2 text-sm font-sans hover:bg-[#FAF9F7] transition-colors flex items-center gap-2 ${
                  !editor.isActive('bulletList') && !editor.isActive('orderedList') ? 'bg-[#b8a862]/10 text-[#b8a862]' : 'text-[#7B756C]'
                }`}
              >
                <span className="w-5">-</span>
                <span>Paragraph</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (editor.isActive('orderedList')) {
                    editor.chain().focus().toggleOrderedList().toggleBulletList().run()
                  } else {
                    editor.chain().focus().toggleBulletList().run()
                  }
                  setListDropdownOpen(false)
                }}
                className={`w-full text-left px-4 py-2 text-sm font-sans hover:bg-[#FAF9F7] transition-colors flex items-center gap-2 ${
                  editor.isActive('bulletList') ? 'bg-[#b8a862]/10 text-[#b8a862]' : 'text-[#7B756C]'
                }`}
              >
                <List size={18} />
                <span>Bullet List</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (editor.isActive('bulletList')) {
                    editor.chain().focus().toggleBulletList().toggleOrderedList().run()
                  } else {
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  setListDropdownOpen(false)
                }}
                className={`w-full text-left px-4 py-2 text-sm font-sans hover:bg-[#FAF9F7] transition-colors flex items-center gap-2 ${
                  editor.isActive('orderedList') ? 'bg-[#b8a862]/10 text-[#b8a862]' : 'text-[#7B756C]'
                }`}
              >
                <ListOrdered size={18} />
                <span>Numbered List</span>
              </button>
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-[#d4cfca]" />

        {/* Text Alignment */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 rounded hover:bg-[#d4cfca]/30 transition-colors ${
            editor.isActive({ textAlign: 'left' }) ? 'bg-[#b8a862]/20 text-[#b8a862]' : 'text-[#7B756C]'
          }`}
          disabled={disabled}
          title="Align Left"
        >
          <AlignLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 rounded hover:bg-[#d4cfca]/30 transition-colors ${
            editor.isActive({ textAlign: 'center' }) ? 'bg-[#b8a862]/20 text-[#b8a862]' : 'text-[#7B756C]'
          }`}
          disabled={disabled}
          title="Align Center"
        >
          <AlignCenter size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 rounded hover:bg-[#d4cfca]/30 transition-colors ${
            editor.isActive({ textAlign: 'right' }) ? 'bg-[#b8a862]/20 text-[#b8a862]' : 'text-[#7B756C]'
          }`}
          disabled={disabled}
          title="Align Right"
        >
          <AlignRight size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={`p-2 rounded hover:bg-[#d4cfca]/30 transition-colors ${
            editor.isActive({ textAlign: 'justify' }) ? 'bg-[#b8a862]/20 text-[#b8a862]' : 'text-[#7B756C]'
          }`}
          disabled={disabled}
          title="Justify"
        >
          <AlignJustify size={18} />
        </button>

        <div className="w-px h-6 bg-[#d4cfca]" />

        {/* Undo/Redo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo() || disabled}
          className="p-2 rounded hover:bg-[#d4cfca]/30 transition-colors text-[#7B756C] disabled:opacity-30 disabled:cursor-not-allowed"
          title="Undo (Cmd+Z)"
        >
          <Undo size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo() || disabled}
          className="p-2 rounded hover:bg-[#d4cfca]/30 transition-colors text-[#7B756C] disabled:opacity-30 disabled:cursor-not-allowed"
          title="Redo (Cmd+Shift+Z)"
        >
          <Redo size={18} />
        </button>
      </div>

      {/* Editor - Scrollable with fixed height */}
      <div className="max-h-[500px] overflow-y-auto">
        <EditorContent
          editor={editor}
          className="prose prose-sm max-w-none p-4 min-h-[300px] focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[300px]"
        />
      </div>

      <style jsx global>{`
        .ProseMirror {
          outline: none;
        }
        .ProseMirror h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 600;
          color: #5a534b;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
        }
        .ProseMirror h1:first-child {
          margin-top: 0;
        }
        .ProseMirror h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: #5a534b;
          margin-top: 1.25rem;
          margin-bottom: 0.75rem;
        }
        .ProseMirror h2:first-child {
          margin-top: 0;
        }
        .ProseMirror h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: #5a534b;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }
        .ProseMirror h3:first-child {
          margin-top: 0;
        }
        .ProseMirror p {
          font-family: 'Lora', serif;
          font-size: 1rem;
          line-height: 1.8;
          color: #5a534b;
          margin-bottom: 1rem;
        }
        .ProseMirror ul,
        .ProseMirror ol {
          font-family: 'Lora', serif;
          padding-left: 2rem;
          margin-bottom: 1rem;
          margin-left: 0;
        }
        .ProseMirror ul {
          list-style-type: disc;
        }
        .ProseMirror ol {
          list-style-type: decimal;
        }
        .ProseMirror li {
          display: list-item;
          margin-bottom: 0.5rem;
          font-family: 'Lora', serif;
          font-size: 1rem;
          line-height: 1.8;
          color: #5a534b;
        }
        .ProseMirror li p {
          margin-bottom: 0.25rem;
        }
        .ProseMirror strong {
          font-weight: 600;
        }
        .ProseMirror em {
          font-style: italic;
        }
        .ProseMirror u {
          text-decoration: underline;
        }
        .ProseMirror a {
          color: #b8a862;
          text-decoration: underline;
          cursor: pointer;
        }
        .ProseMirror a:hover {
          color: #a89752;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9b9589;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror:focus {
          outline: none;
        }
        /* Better selection styling */
        .ProseMirror ::selection {
          background-color: rgba(184, 168, 98, 0.2);
        }
      `}</style>
    </div>
  )
}

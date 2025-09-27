import {StructureResolver} from 'sanity/structure'
import {UserIcon, BookIcon, ProjectsIcon, ComposeIcon, EnvelopeIcon} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Konten Website')
    .items([
      // --- DOKUMEN SINGLETON (HANYA BISA DIEDIT) ---
      S.listItem()
        .title('Profile')
        .id('profile')
        .icon(UserIcon)
        .child(
          S.document()
            .schemaType('profile')
            .documentId('profile')
            .title('Edit Profile')
        ),
      
      // ▼▼▼ TAMBAHKAN BLOK INI ▼▼▼
      S.listItem()
        .title('Contact Info')
        .id('contact')
        .icon(EnvelopeIcon) // Ikon untuk menu Contact
        .child(
          S.document()
            .schemaType('contact')
            .documentId('contact')
            .title('Edit Contact Info')
        ),
      
      S.divider(),

      // --- DAFTAR DOKUMEN (BISA DITAMBAH/HAPUS) ---
      S.documentTypeListItem('experience')
        .title('Experience')
        .icon(BookIcon),
      
      S.documentTypeListItem('project')
        .title('Projects')
        .icon(ProjectsIcon),
      
      S.documentTypeListItem('credential')
        .title('Credentials')
        .icon(ComposeIcon),
    ])

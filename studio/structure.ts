import {StructureResolver} from 'sanity/structure'
import {UserIcon, BookIcon, ProjectsIcon, ComposeIcon} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Konten Website')
    .items([
      // --- DOKUMEN SINGLETON ---
      S.listItem()
        .title('Profile')
        .id('profile')
        .icon(UserIcon) // Tambahkan Ikon
        .child(
          S.document()
            .schemaType('profile')
            .documentId('profile')
            .title('Edit Profile')
        ),
      
      S.divider(),

      // --- DAFTAR DOKUMEN ---
      S.documentTypeListItem('experience')
        .title('Experience')
        .icon(BookIcon), // Tambahkan Ikon
      
      S.documentTypeListItem('project')
        .title('Projects')
        .icon(ProjectsIcon), // Tambahkan Ikon
      
      S.documentTypeListItem('credential')
        .title('Credentials')
        .icon(ComposeIcon), // Tambahkan Ikon
    ])
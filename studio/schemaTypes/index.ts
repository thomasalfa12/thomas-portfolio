import profile from './profile'
import experience from './experience'
import project from './projects'
import credential from './credential' // <-- Tambahkan ini

export const schema = {
  types: [profile, experience, project, credential], // <-- Tambahkan ini
}
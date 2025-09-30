import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{ _type: string }>(
      req,
      SANITY_WEBHOOK_SECRET,
    )
    if (!isValidSignature) {
      return new Response('Invalid Signature', { status: 401 })
    }

    if (!body?._type) {
      return new Response('Bad Request', { status: 400 })
    }
    
    // Perbarui cache untuk seluruh halaman ('/') setiap kali ada perubahan
    revalidatePath('/')

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error(errorMessage);
    return new Response(errorMessage, { status: 500 });
  }
}
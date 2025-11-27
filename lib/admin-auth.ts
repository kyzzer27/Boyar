export async function createAdminToken(secret: string): Promise<string> {
  const encoded = new TextEncoder().encode(secret);
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
}


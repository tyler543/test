export function storeToken(tok: any): void {
  try {
    localStorage.setItem('token_data', tok.accessToken);
  } catch (e) {
    console.log(e);
  }
}

export function retrieveToken(): string | null {
  try {
    return localStorage.getItem('token_data');
  } catch (e) {
    console.log(e);
    return null;
  }
}
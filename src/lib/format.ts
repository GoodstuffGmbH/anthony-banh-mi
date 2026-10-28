// tel:-URI nur aus Ziffern und führendem Plus, egal wie die Nummer geschrieben ist.
export const telHref = (phone: string) => `tel:${phone.replace(/(?!^\+)[^\d]/g, '')}`;

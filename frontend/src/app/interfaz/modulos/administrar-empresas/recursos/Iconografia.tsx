import { SVGProps } from 'react';

export function VerRegistro() {
  return (
    <g fill='none' stroke='var(--brand-primary)' strokeWidth='1.5'>
      <path d='M16 4.002c2.175.012 3.353.109 4.121.877C21 5.758 21 7.172 21 10v6c0 2.829 0 4.243-.879 5.122C19.243 22 17.828 22 15 22H9c-2.828 0-4.243 0-5.121-.878C3 20.242 3 18.829 3 16v-6c0-2.828 0-4.242.879-5.121c.768-.768 1.946-.865 4.121-.877'></path>
      <path strokeLinecap='round' d='M8 14h8m-9-3.5h10m-8 7h6'></path>
      <path d='M8 3.5A1.5 1.5 0 0 1 9.5 2h5A1.5 1.5 0 0 1 16 3.5v1A1.5 1.5 0 0 1 14.5 6h-5A1.5 1.5 0 0 1 8 4.5z'></path>
    </g>
  );
}

export function EvaluacionesIcon() {
  return (
    <g fill='none' stroke='var(--brand-secondary)' strokeWidth='1.5'>
      <path d='M19.898 16h-12c-.93 0-1.395 0-1.777.102A3 3 0 0 0 4 18.224'></path>
      <path
        strokeLinecap='round'
        d='M8 7h8m-8 3.5h5m6.5 8.5H8m2 3c-2.828 0-4.243 0-5.121-.879C4 20.243 4 18.828 4 16V8c0-2.828 0-4.243.879-5.121C5.757 2 7.172 2 10 2h4c2.828 0 4.243 0 5.121.879C20 3.757 20 5.172 20 8m-6 14c2.828 0 4.243 0 5.121-.879C20 20.243 20 18.828 20 16v-4'
      ></path>
    </g>
  );
}

export function EnvioCorreosIcon() {
  return (
    <g
      fill='none'
      stroke='var(--color-add-blue-6)'
      strokeLinecap='round'
      strokeWidth='1.5'
    >
      <path
        d='M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2'
        opacity='.5'
      ></path>
      <path
        strokeLinejoin='round'
        d='m16.155 3.434l2.357 2.043c1.623 1.406 2.434 2.11 2.434 3.023c0 .913-.811 1.616-2.434 3.023l-2.357 2.043c-.714.618-1.07.927-1.363.794c-.292-.134-.292-.606-.292-1.55v-1.524c-3 0-6.25 1.393-7.5 3.714c0-7.429 4.444-9.286 7.5-9.286V4.19c0-.944 0-1.416.292-1.55c.293-.133.65.176 1.363.794'
      ></path>
    </g>
  );
}

export function CloseModalIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1.5em'
      height='1.5em'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        fill='var(--color-add-red-5)'
        fillRule='evenodd'
        d='M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22ZM8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 1 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 1 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06Z'
        clipRule='evenodd'
      ></path>
    </svg>
  );
}

export function SinDatosIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='2em'
      height='2em'
      viewBox='0 0 24 24'
      {...props}
    >
      <g fill='none' stroke='var(--color-placeholder)' strokeWidth='1.5'>
        <path
          d='M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z'
          opacity='.5'
        ></path>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='m8 12l2-1.5L8 9m8 3l-2-1.5L16 9m-1 7l-1-1l-1 1l-1-1l-1 1l-1-1l-1 1'
        ></path>
      </g>
    </svg>
  );
}

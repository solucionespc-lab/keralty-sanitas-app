import { SVGProps } from 'react';

export function BackButtonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1.5em'
      height='1.5em'
      viewBox='0 0 24 24'
      style={{ transform: 'rotate(180deg)' }}
      {...props}
    >
      <g fill='none' strokeLinecap='round' strokeWidth='1.5'>
        <path strokeLinejoin='round' d='M7 12h7m0 0l-3 3m3-3l-3-3'></path>
        <path d='M17 16V8m5 4c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536'></path>
      </g>
    </svg>
  );
}

export function StakeHolderIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='2em'
      height='2em'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='m10.007 3.772l-6 5.333A3 3 0 0 0 3 11.347v9.903H2a.75.75 0 1 0 0 1.5h20a.75.75 0 0 0 0-1.5h-1v-9.903a3 3 0 0 0-1.007-2.242l-6-5.333a3 3 0 0 0-3.986 0M10 8.25a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5zm4.052 3c.899 0 1.648 0 2.242.08c.628.084 1.195.27 1.65.726c.456.455.642 1.022.726 1.65c.08.594.08 1.344.08 2.242v5.302H5.25v-5.302c0-.898 0-1.648.08-2.242c.084-.628.27-1.195.725-1.65c.456-.456 1.023-.642 1.65-.726c.595-.08 1.345-.08 2.243-.08z'
        clipRule='evenodd'
      ></path>
      <path
        fill='currentColor'
        d='M14.052 11.25H9.948c-.898 0-1.648 0-2.242.08c-.628.084-1.195.27-1.65.726c-.456.455-.642 1.022-.726 1.65c-.08.594-.08 1.344-.08 2.242v5.302h13.5v-5.302c0-.898 0-1.648-.08-2.242c-.084-.628-.27-1.195-.726-1.65c-.455-.456-1.022-.642-1.65-.726c-.594-.08-1.344-.08-2.242-.08'
        opacity='.5'
      ></path>
      <path
        fill='currentColor'
        d='M9 14.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5zm0 3a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5z'
      ></path>
    </svg>
  );
}

export function EditIconTable() {
  return (
    <g fill='none' stroke='var(--color-primary-text)' strokeWidth='1.5'>
      <path strokeLinecap='round' d='M4 22h16'></path>
      <path d='m13.888 3.663l.742-.742a3.146 3.146 0 1 1 4.449 4.45l-.742.74m-4.449-4.448s.093 1.576 1.483 2.966c1.39 1.39 2.966 1.483 2.966 1.483m-4.449-4.45L7.071 10.48c-.462.462-.693.692-.891.947a5.24 5.24 0 0 0-.599.969c-.139.291-.242.601-.449 1.22l-.875 2.626m14.08-8.13l-6.817 6.817c-.462.462-.692.692-.947.891c-.3.234-.625.435-.969.599c-.291.139-.601.242-1.22.448l-2.626.876m0 0l-.641.213a.848.848 0 0 1-1.073-1.073l.213-.641m1.501 1.5l-1.5-1.5'></path>
    </g>
  );
}

export function PDFDescargaIcon() {
  return (
    <g fill='none'>
      <path
        fill='currentColor'
        fillOpacity='.25'
        d='M16 16H8.415c-1.184 0-1.776 0-2.299.202q-.412.16-.76.43c-.442.344-.747.852-1.356 1.868V7c0-1.886 0-2.828.586-3.414S6.114 3 8 3h8c1.886 0 2.828 0 3.414.586S20 5.114 20 7v5c0 1.886 0 2.828-.586 3.414S17.886 16 16 16'
      ></path>
      <path
        stroke='currentColor'
        strokeWidth='1.2'
        d='M20 12v5c0 1.886 0 2.828-.586 3.414S17.886 21 16 21H6.5a2.5 2.5 0 0 1 0-5H16c1.886 0 2.828 0 3.414-.586S20 13.886 20 12V7c0-1.886 0-2.828-.586-3.414S17.886 3 16 3H8c-1.886 0-2.828 0-3.414.586S4 5.114 4 7v11.5'
      ></path>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeWidth='1.2'
        d='m9 10l1.293 1.293a1 1 0 0 0 1.414 0L15 8'
      ></path>
    </g>
  );
}

export function DescargarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      {...props}
    >
      <g fill='none' stroke='var(--brand-primary)' strokeWidth='2'>
        <path d='M21 12h-2.93c-.524 0-.786 0-1.007.118c-.22.119-.366.337-.657.773l-.812 1.218c-.29.436-.436.654-.657.773c-.221.118-.483.118-1.007.118h-3.86c-.524 0-.786 0-1.007-.118c-.22-.119-.366-.337-.657-.773l-.812-1.218c-.29-.436-.436-.654-.657-.773C6.716 12 6.454 12 5.93 12H3'></path>
        <path
          strokeLinecap='round'
          d='m5 9l-1.707 1.707a1 1 0 0 0-.293.707V17a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5.586a1 1 0 0 0-.293-.707L19 9'
        ></path>
        <path d='m8.5 7l3.5 3m0 0l3.5-3M12 10V3'></path>
      </g>
    </svg>
  );
}

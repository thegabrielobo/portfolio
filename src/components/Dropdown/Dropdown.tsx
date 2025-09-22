import { useState } from 'react';

interface Props {
  forceOpen?: boolean;
  label?: string;
  withDivider?: boolean;
  icon?: JSX.Element;
  items: DDMItem[];
  withBackground?: boolean;
}

interface DDMItem {
  icon?: JSX.Element;
  label: string;
  desc?: string;
  link?: string;
}

const Dropdown = ({
  forceOpen = false,
  label,
  withDivider,
  icon,
  items,
  withBackground = false,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownContent = (forceOpen || isOpen) && (
      <div className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-base-100 ring-1 ring-base-300 z-[60]'>
      <div
              className={ `py-1 ${ withDivider ? 'divide-y divide-base-200' : '' }` }
        role='menu'
        aria-orientation='vertical'
        aria-labelledby='options-menu'
      >
        { items.map((item) => (
          <a
            key={ item.label }
            href={ item.link || '#' }
            className={ `${ item.icon ? 'flex items-center' : 'block'
                } block px-4 py-2 text-md text-base-content hover:bg-base-200 hover:text-base-content` }
            role='menuitem'
          >
            { item.icon }
            <span className='flex flex-col'>
              <span>{ item.label }</span>
              { item.desc && (
                        <span className='text-base-content/60 text-xs'>{ item.desc }</span>
              ) }
            </span>
          </a>
        )) }
      </div>
    </div>
  );

  return (
    <div className='relative inline-block text-left'>
      <div>
        <button
          type='button'
          onClick={ () => setIsOpen(!isOpen) }
          className={ `${ withBackground
              ? 'border border-base-300 bg-base-100 shadow-sm'
            : ''
              } flex items-center justify-center w-full rounded-md px-4 py-2 text-sm font-medium text-base-content hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-100 focus:ring-primary` }
          id='options-menu'
        >
          { label }
          { icon || (
            <svg
              width='20'
              height='20'
              fill='currentColor'
              viewBox='0 0 1792 1792'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z' />
            </svg>
          ) }
        </button>
      </div>
      { dropdownContent }
    </div>
  );
};

export { Dropdown };
export type { DDMItem };

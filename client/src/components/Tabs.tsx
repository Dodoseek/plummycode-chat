'use client';
import { ProfileInfo, ProfileList, User } from '@/types/types';
import { Tab } from '@headlessui/react'
import { Names } from '@/types/types'
import Link from 'next/link';
import Image from 'next/image';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const Tabs = ({ profile }: { profile: ProfileList[] }) => {

  return (
    <div className="w-full px-2 pb-5 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {profile.map(({ name }) => (
            <Tab
              key={name}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(profile).map(({ list, name }) => (
            <Tab.Panel
              key={name}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <ul>
                {name === Names.profile ? (list as ProfileInfo[]).map(({ value, title }) => (
                  <li
                    key={value}
                    className="relative rounded-md p-3 hover:bg-gray-100"
                  >
                    <h3 className="text-sm font-medium leading-5">
                      {value}
                    </h3>

                    <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                      <li>{title}</li>
                    </ul>
                  </li>
                )) :
                  (list as User[]).map(({ username, first_name, last_name, image, id, slug }) => (
                    <li
                      key={id}
                      className="relative rounded-md p-3 flex items-center justify-between hover:bg-gray-100"
                    >

                      <div className='bg-violet-400 p-px rounded-full'>
                        <Image src={image} width={50} height={50} alt={first_name && last_name
                          ? `${first_name} ${last_name}`
                          : username} className='h-10 w-10 rounded-full' />
                      </div>
                      <h3 className="text-sm font-medium leading-5">
                        {first_name && last_name
                          ? `${first_name} ${last_name}`
                          : username}
                      </h3>

                      {/* <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                        <li>{username}</li>
                      </ul> */}

                      <Link
                        href={slug}
                        className={classNames(
                          'absolute inset-0 rounded-md',
                          'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                        )}
                      />
                    </li>
                  ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

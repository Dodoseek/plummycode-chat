'use client';
import { Tab } from '@headlessui/react'
import { RestrictiveUser, TabUserNames } from '@/types/users'
import { FriendProfilePanel, ProfileInfoPanel, ReceivedPanel, SendedPanel } from './Panels';
import { FriendRequest, TabFriendRequestNames } from '@/types/friends';
import { IsEmpty } from './Utility';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const Tabs = ({ array, className }: { array: TabObject[], className: string }) => {

  return (
    <div className={className}>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {array.map(({ name }, index) => (
            <Tab
              key={index}
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
          {Object.values(array).map(({ list, name }, index) => {
            return (
              <Tab.Panel
                key={index}
                className={classNames(
                  'rounded-xl bg-white p-3',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                )}
              >
                <ul>
                  {name === TabUserNames.profile && (list as InfoTabs[]).map((item, index) => (
                    <ProfileInfoPanel key={index} {...item} />
                  ))}

                  {name === TabUserNames.friends ? list.length > 0 ? (list as RestrictiveUser[]).map((friend) => (
                    <FriendProfilePanel key={friend.id} {...friend} />
                  )) : <IsEmpty buttonToUsers={false} text='The friends list is empty' /> : null}

                  {name === TabFriendRequestNames.received ? list.length > 0 ? (list as FriendRequest[]).map((received) => (
                    <ReceivedPanel key={received.id} {...received} />
                  )) : <IsEmpty buttonToUsers={false} text='No friend requests' /> : null}

                  {name === TabFriendRequestNames.submitted ? list.length > 0 ? (list as FriendRequest[]).map((received) => (
                    <SendedPanel key={received.id} {...received} />
                  )) : <IsEmpty buttonToUsers={false} text='You have not sent a friend request' /> : null}
                </ul>
              </Tab.Panel>
            )
          })}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

import React, {useState, useEffect} from 'react';
import {useQuery} from 'react-query';
import Pagination from './Pagination';
import Modal from './Modal';
import {User} from '../types/@types';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faPen,
  faTrashCan,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';
import UserListHeader from './UserListHeader';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [displayUsers, setDisplayUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | ''>('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleEdit = (id: number) => {
    setSelectedUserId(id);
    setModalType('edit');
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (modalType === 'create') {
      setUsers([...users, {id: users.length + 1, name, role}]);
    } else if (modalType === 'edit') {
      const updatedUsers = users.map(item => {
        if (item.id === selectedUserId) {
          return {
            ...item,
            name,
            role,
          };
        }
        return item;
      });
      setUsers(updatedUsers);
    }
    setName('');
    setRole('');
    setSelectedUserId(null);
    setModalOpen(false);
  };
  const handleCreate = () => {
    setModalType('create');
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setName('');
    setRole('');
    setSelectedUserId(null);
  };

  const handlePageChange = (page: number) => {
    if (page > 0) setCurrentPage(page);
  };

  const {data, status} = useQuery('users', async () => {
    const response = await fetch('https://www.jsonkeeper.com/b/85VE');
    return response.json();
  });
  useEffect(() => {
    if (status === 'success') {
      setUsers(data);
    }
    setIsLoading(status === 'loading' ? true : false);
  }, [data, status]);

  useEffect(() => {
    if (users.length > 7)
      setDisplayUsers(users.filter((item, ind) => ind >= 0 && ind < 7));
    else setDisplayUsers(users);
  }, [users]);

  useEffect(() => {
    setDisplayUsers(
      users.filter(
        (item, ind) => ind >= (currentPage - 1) * 7 && ind < currentPage * 7
      )
    );
  }, [currentPage, users]);

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  return (
    <>
      <div className="w-full rounded overflow-hidden shadow-lg my-6">
        <UserListHeader users={users} handleCreate={handleCreate} />
        <hr className="my-4 h-px bg-gray-200 border-0 dark:bg-gray-200"></hr>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="font-normal text-gray-600 text-sm text-left w-96 pl-8">
                Name <FontAwesomeIcon icon={faArrowDown} size="sm" />
              </th>
              <th className="font-normal text-gray-600 text-sm text-left w-32">
                Status <FontAwesomeIcon icon={faArrowDown} size="sm" />
              </th>
              <th className="font-normal text-gray-600 text-sm text-left w-28">
                Role <FontAwesomeIcon icon={faArrowDown} size="sm" />
              </th>
              <th className="font-normal text-gray-600 text-sm text-left w-48">
                Last Login <FontAwesomeIcon icon={faArrowDown} size="sm" />
              </th>
              <th className="font-normal text-sm text-center w-16"></th>
              <th className="font-normal text-sm text-center w-16"></th>
            </tr>
          </thead>
          <tbody>
            {displayUsers?.map((user, index) => (
              <tr
                key={user.id}
                className={`${
                  index % 2 !== 0 &&
                  'bg-gray-200 border border-t-gray-300 border-b-gray-300'
                } h-16`}
              >
                <td className="pl-8 text-sm font-semibold">{user.name}</td>
                <td>
                  {Math.round(Math.random()) === 0 ? (
                    <span className="bg-gray-100 text-gray-700 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-300 dark:text-gray-900 h-fit">
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="fill-gray-900 h-2 mb-0.5 text-center"
                      ></FontAwesomeIcon>
                      {'  '}
                      Invited
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900 h-fit">
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="fill-green-900 h-2 mb-0.5 text-center"
                      ></FontAwesomeIcon>
                      {'  '}
                      Active
                    </span>
                  )}
                </td>
                <td className="text-sm text-gray-600 font-semibold">
                  {user.role}
                </td>
                <td className="text-sm font-semibold">
                  {moment(moment(), 'YYYY-MM-DDTHH:mm:ssZ').format(
                    'MMM D YYYY h:mm a'
                  )}
                </td>
                <td className="text-center">
                  <button type="button" onClick={() => handleDelete(user.id)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </td>
                <td className="text-center">
                  <button type="button" onClick={() => handleEdit(user.id)}>
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr className="mt-4 h-px bg-gray-200 border-0 dark:bg-gray-200"></hr>
        <Pagination
          users={users}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
        {modalOpen && (
          <Modal isOpen={modalOpen} onClose={handleCancel}>
            <form className="w-full max-w-sm" onSubmit={handleSubmit}>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="name"
                  >
                    Name
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    id="name"
                    type="text"
                    value={name}
                    onChange={event => setName(event.target.value)}
                  />
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="role"
                  >
                    Role
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    id="role"
                    type="text"
                    value={role}
                    onChange={event => setRole(event.target.value)}
                  />
                </div>
              </div>
              <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 border border-blue-700 rounded text-sm h-fit"
                    type="submit"
                  >
                    {modalType === 'create' ? 'Add' : 'Edit'} User
                  </button>
                </div>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </>
  );
};

export default UserList;

import React from 'react'

const DeleteAlert  = ({content,onDelete}) => {
  return (
    <div>
        <p className='text-sm text-center pt-4'>
          {content}
        </p>

        <div className='flex justify-end mt-6 p-2'>
            <button
            type="button"
            className="add-btn add-btn-fill"
            onClick={onDelete}
            >
            Delete
            </button>
        </div>

    </div>
  )
}

export default DeleteAlert 
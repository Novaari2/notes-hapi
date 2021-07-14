// import nanoid
const nanoid = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {

    // menangkap request dari client melalui body request dengan payload
    const {
        title,
        tags,
        body
    } = request.payload;

    // membuat nilai id yang bersifat uniq dengan library nanoid
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    //memasukkan nilai yg dibutuhkan ke array notes
    const newNote = {
        title,
        tags,
        body,
        id,
        createdAt,
        updatedAt,
    };
    notes.push(newNote);

    // cek
    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });

        response.code(201);
        return response;
        // console.log(response);
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal Ditambahkan',
    });

    response.code(500);
    return response;
};

// tampil notes

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});


module.exports = {
    addNoteHandler,
    getAllNotesHandler
};
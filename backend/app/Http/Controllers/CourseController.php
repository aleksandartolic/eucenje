<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Validator;

class CourseController extends Controller
{
    public function store(Request $request)
    {
        $rules = [
           'uid' => ['required', 'exists:users,id', 'integer'],
           'name' => ['required', 'string', 'max:55', 'unique:courses'],
           'description' => ['required', 'string', 'max:255'],
        ];

        $response = array('success' => false, 'message' => '');
        $validator = Validator::make($request->all(), $rules);

        if($validator->fails())
        {
          $response['message'] = $validator->messages();
          return response()->json(['response' => $response], 422);
        } else {
            try {
                if($file = $request->file('picture')) {
                    $path = $file->store('public/picture');
                    $exploded = explode('/', $path);
                    $pictureName = end($exploded);
                    $course = Course::create([
                        'uid' => $request->uid,
                        'name' => strip_tags(htmlentities($request->name)),
                        'description' => strip_tags(htmlentities($request->description)),
                        'picture' => basename($path),
                    ]);

                    $response['success'] = true;
                    $response['course'] = $course;
                } else {
                    $response['success'] = false;
                    $response['message'] = 'No file found.';
                }

            } catch (Exception $e) {
                return response()->json(['success' => false, 'message' => 'Error saving entry to database.'], 422);
            }
        }

        return response()->json(['response' => $response]);
    }

    public function update(Request $request)
    {
        $rules = [
            'course_id' => ['required', 'exists:courses', 'integer'],
            'uid' => ['required', 'exists:users,id', 'integer'],
            'name' => ['required', 'string', 'max:55'],
            'description' => ['required', 'string', 'max:255'],
        ];

        $response = array('success' => false, 'message' => '');
        $validator = Validator::make($request->all(), $rules);

        if($validator->fails())
        {
            $response['message'] = $validator->messages();
            return response()->json(['response' => $response], 422);
        } else {
            try {
                $course = Course::findOrFail($request->course_id);
                $course->name = strip_tags(htmlentities($request->name));
                $course->description = (strip_tags(htmlentities($request->description)));
                $course->save();

                $response['success'] = true;
                $response['course'] = $course;
            } catch (Exception $e) {
                return response()->json(['success' => false, 'message' => 'Error saving entry to database.'], 422);
            }
        }

        return response()->json(['response' => $response]);
    }


    public function delete(Request $request)
    {
        try {
            $course = Course::findOrFail($request->course_id);
            $course->delete();

            return response()->json(['success' => true, 'message' => 'Course successfully deleted.']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'Error deleting course.'])->setStatusCode(422);
        }
    }

    public function listUserCourses(Request $request)
    {
        if(!$request->uid) {
            return response()->json(['success' => false, 'message' => 'You have to provide user id (uid)!'])->setStatusCode(422);
        }

        try {
            $courses = Course::where('uid', '=', $request->uid)->get();

            return response()->json(['success' => true, 'courses' => $courses]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'Error deleting course.'])->setStatusCode(422);
        }
    }

    public function getCourse(Request $request)
    {
        try {
            $course = Course::findOrFail($request->cid);
            return response()->json(['success' => true, 'media' => $course]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'user' => 'Unable to get course.'])->setStatusCode(422);
        }
    }
}

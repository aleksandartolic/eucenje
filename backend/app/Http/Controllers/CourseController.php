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
        } else {
            try {
                $course = Course::create([
                    'uid' => $request->uid,
                    'name' => strip_tags(htmlentities($request->name)),
                    'description' => strip_tags(htmlentities($request->description)),
                ]);

                $response['success'] = true;
                $response['course'] = $course;
            } catch (Exception $e) {
                return response()->json(['success' => false, 'message' => 'Error saving entry to database.']);
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
        } else {
            try {
                $course = Course::findOrFail($request->course_id);
                $course->name = strip_tags(htmlentities($request->name));
                $course->description = (strip_tags(htmlentities($request->description)));
                $course->save();

                $response['success'] = true;
                $response['course'] = $course;
            } catch (Exception $e) {
                return response()->json(['success' => false, 'message' => 'Error saving entry to database.']);
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
            return response()->json(['success' => false, 'message' => 'Error deleting course.']);
        }
    }

}

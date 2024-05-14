namespace Velocity.Utility
{
    public class ApiResponse<T>
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }
    }

    public static class ApiResponse
    {
        public static ApiResponse<T> Success<T>(T data, string message = "Success")
        {
            return new ApiResponse<T>
            {
                Success = true,
                Message = message,
                Data = data
            };
        }

        public static ApiResponse<object> Fail(string message = "Failed")
        {
            return new ApiResponse<object>
            {
                Success = false,
                Message = message,
                Data = null
            };
        }
    }

}

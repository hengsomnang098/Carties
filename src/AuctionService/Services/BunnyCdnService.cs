using System.Net.Http.Headers;

namespace AuctionService.Services
{
    public interface IFileUploadService
    {
        Task<string> UploadToBunnyCdnAsync(IFormFile file, string folder = "uploads");
    }

    public class BunnyCdnService : IFileUploadService
    {
        private readonly HttpClient _httpClient;
        private readonly string _storageZoneName;
        private readonly string _accessKey;
        private readonly string _regionUrl;
        private readonly string _cdnBaseUrl;

        public BunnyCdnService(IConfiguration config)
        {
            _httpClient = new HttpClient();
            _storageZoneName = config["BunnyCdn:StorageZoneName"];
            _accessKey = config["BunnyCdn:AccessKey"];
            _regionUrl = config["BunnyCdn:RegionUrl"];
            _cdnBaseUrl = config["BunnyCdn:CdnBaseUrl"];
        }

        public async Task<string> UploadToBunnyCdnAsync(IFormFile file, string folder = "uploads")
        {
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var uploadUrl = $"{_regionUrl}/{_storageZoneName}/{folder}/{fileName}";

            _httpClient.DefaultRequestHeaders.Add("AccessKey", _accessKey);

            using var fileStream = file.OpenReadStream();
            using var content = new StreamContent(fileStream);
            content.Headers.ContentType = new MediaTypeHeaderValue(file.ContentType);

            var response = await _httpClient.PutAsync(uploadUrl, content);
            response.EnsureSuccessStatusCode();

            return $"{_cdnBaseUrl}/{folder}/{fileName}";
        }
    }
}
